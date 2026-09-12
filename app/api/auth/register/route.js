import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const { fullName, email, password, phone } = await request.json();

    if (!fullName || !email || !password) {
      return Response.json(
        { message: 'Full name, email, and password are required' },
        { status: 400 }
      );
    }

    // Check if customer already exists
    const existingCustomer = await prisma.customer.findUnique({
      where: { email },
    });

    if (existingCustomer) {
      return Response.json(
        { message: 'Email already registered' },
        { status: 409 }
      );
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create new customer
    const newCustomer = await prisma.customer.create({
      data: {
        fullName,
        email,
        passwordHash,
        phone: phone || null,
      },
    });

    // Return user data (without password hash)
    return Response.json(
      {
        id: newCustomer.id,
        fullName: newCustomer.fullName,
        email: newCustomer.email,
        phone: newCustomer.phone,
        address: newCustomer.address,
        city: newCustomer.city,
        state: newCustomer.state,
        pincode: newCustomer.pincode,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return Response.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
