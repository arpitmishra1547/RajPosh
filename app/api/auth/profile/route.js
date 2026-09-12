import { prisma } from '@/lib/prisma';

export async function PUT(request) {
  try {
    const { userId, fullName, phone, address, city, state, pincode } = await request.json();

    if (!userId) {
      return Response.json(
        { message: 'User ID is required' },
        { status: 400 }
      );
    }

    // Update customer
    const updatedCustomer = await prisma.customer.update({
      where: { id: parseInt(userId) },
      data: {
        ...(fullName && { fullName }),
        ...(phone && { phone }),
        ...(address && { address }),
        ...(city && { city }),
        ...(state && { state }),
        ...(pincode && { pincode }),
      },
    });

    // Return updated user data
    return Response.json({
      id: updatedCustomer.id,
      fullName: updatedCustomer.fullName,
      email: updatedCustomer.email,
      phone: updatedCustomer.phone,
      address: updatedCustomer.address,
      city: updatedCustomer.city,
      state: updatedCustomer.state,
      pincode: updatedCustomer.pincode,
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return Response.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
