from models import Medicine, Sale, Purchase
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime

from database import SessionLocal, engine
import models
from models import Medicine, Sale

# -------------------------
# CREATE APP
# -------------------------
app = FastAPI()

# -------------------------
# CORS
# -------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# CREATE TABLES
# -------------------------
models.Base.metadata.create_all(bind=engine)

# -------------------------
# DATABASE DEPENDENCY
# -------------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# -------------------------
# GET ALL MEDICINES
# -------------------------
@app.get("/medicines")
def get_medicines(db: Session = Depends(get_db)):
    medicines = db.query(Medicine).all()
    return medicines

# -------------------------
# CREATE SALE
# -------------------------
@app.post("/sales")
def create_sale(data: dict, db: Session = Depends(get_db)):

    medicine = db.query(Medicine).filter(Medicine.id == data["medicine_id"]).first()

    if not medicine:
        return {"error": "Medicine not found"}

    if medicine.stock < data["quantity"]:
        return {"error": "Not enough stock"}

    # Reduce stock
    medicine.stock -= data["quantity"]

    total_amount = medicine.price * data["quantity"]

    invoice_number = f"INV-{int(datetime.utcnow().timestamp())}"

    new_sale = Sale(
        invoice=invoice_number,
        customer="Walk-in",
        amount=total_amount,
        medicine_id=medicine.id
    )

    db.add(new_sale)
    db.commit()

    return {"message": "Sale created"}

# -------------------------
# CREATE PURCHASE
# -------------------------
@app.post("/purchases")
def create_purchase(data: dict, db: Session = Depends(get_db)):

    medicine = db.query(Medicine).filter(Medicine.id == data["medicine_id"]).first()

    if not medicine:
        return {"error": "Medicine not found"}

    # Increase stock
    medicine.stock += data["quantity"]

    new_purchase = Purchase(
        supplier=data["supplier"],
        quantity=data["quantity"],
        cost=data["cost"],
        medicine_id=medicine.id
    )

    db.add(new_purchase)
    db.commit()

    return {"message": "Purchase recorded"}

# -------------------------
# GET ALL PURCHASES
# -------------------------
@app.get("/purchases")
def get_purchases(db: Session = Depends(get_db)):

    purchases = db.query(Purchase).all()

    return [
        {
            "id": p.id,
            "supplier": p.supplier,
            "medicine_name": p.medicine.name if p.medicine else "",
            "quantity": p.quantity,
            "cost": p.cost,
            "date": p.date.strftime("%Y-%m-%d %H:%M")
        }
        for p in purchases
    ]

# -------------------------
# SAFE SEED MEDICINES
# -------------------------
@app.get("/seed")
def seed_data(db: Session = Depends(get_db)):

    existing = db.query(Medicine).first()
    if existing:
        return {"message": "Medicines already seeded"}

    med1 = Medicine(name="Paracetamol", stock=20, price=10)
    med2 = Medicine(name="Crocin", stock=15, price=8)
    med3 = Medicine(name="Aspirin", stock=5, price=12)

    db.add_all([med1, med2, med3])
    db.commit()

    return {"message": "Medicines added successfully"}

# -------------------------
# GET ALL SALES
# -------------------------
@app.get("/sales")
def get_sales(db: Session = Depends(get_db)):

    sales = db.query(Sale).all()

    return [
        {
            "id": s.id,
            "invoice": s.invoice,
            "medicine_name": s.medicine.name if s.medicine else "",
            "amount": s.amount,
            "date": s.date.strftime("%Y-%m-%d %H:%M")
        }
        for s in sales
    ]