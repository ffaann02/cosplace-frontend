"use client";
import { apiClientWithAuth } from '@/api';
import { useAuth } from '@/context/auth-context';
import React, { useEffect } from 'react'

const ShopDashboard = () => {

  const { user } = useAuth(); 

  const getSellerInfo = async () => {
    try {
      const response = await apiClientWithAuth.post("/shop/seller/info", {
        user_id: user?.user_id
      })
      console.log(response.data.seller)
    } catch (error) {
      console.log(error)
    }
  }

  // Check role
  useEffect(() => {
    if (user) {
      console.log(user)
      getSellerInfo()
    }
  }, [])

  return (
    <div>shop-dashboard</div>
  )
}

export default ShopDashboard