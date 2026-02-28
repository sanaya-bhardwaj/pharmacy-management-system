from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime


class Medicine(Base):
    __tablename__ = "medicines"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    stock = Column(Integer)
    price = Column(Float)

    sales = relationship("Sale", back_populates="medicine")


class Sale(Base):
    __tablename__ = "sales"

    id = Column(Integer, primary_key=True, index=True)
    invoice = Column(String, unique=True, index=True)
    customer = Column(String)
    amount = Column(Float)
    date = Column(DateTime, default=datetime.utcnow)

    medicine_id = Column(Integer, ForeignKey("medicines.id"))
    medicine = relationship("Medicine", back_populates="sales")

# -------------------------
# PURCHASE MODEL
# -------------------------

class Purchase(Base):
    __tablename__ = "purchases"

    id = Column(Integer, primary_key=True, index=True)
    supplier = Column(String)
    quantity = Column(Integer)
    cost = Column(Float)
    date = Column(DateTime, default=datetime.utcnow)

    medicine_id = Column(Integer, ForeignKey("medicines.id"))
    medicine = relationship("Medicine")