const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  console.error('NEXT_PUBLIC_API_URL is not defined in environment variables');
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserData {
  id: string;
  accessToken: string;
  refreshToken: string;
  name: string;
  email: string;
  profilePicUrl: string;
  role: string;
  profileComplete: boolean;
  profileStatus: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: UserData | null;
  errors: null | any;
  count: number;
}

export interface OTPVerificationRequest {
  email: string;
  otp: string;
}

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  if (!API_URL) {
    throw new Error('API URL is not configured. Please check your environment variables.');
  }

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    console.log("@@@response", response);

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const signup = async (credentials: SignupCredentials): Promise<AuthResponse> => {
  if (!API_URL) {
    throw new Error('API URL is not configured. Please check your environment variables.');
  }

  // Validate password match
  if (credentials.password !== credentials.confirmPassword) {
    throw new Error('Passwords do not match');
  }

  try {
    const response: any = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...credentials
      }),
    });

    if (!response?.ok) {
      console.log("@@@signup response", response);
      throw new Error(response?.message || 'Signup failed');
    }

    const result = await response.json();

    console.log("@@@signup result", result);

    return result;
  } catch (error) {
    console.error('Error during signup:', error);
    throw error;
  }
};

export const verifyOTP = async (request: OTPVerificationRequest): Promise<AuthResponse> => {
  if (!API_URL) {
    throw new Error('API URL is not configured. Please check your environment variables.');
  }

  try {
    const response = await fetch(`${API_URL}/verify-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error('OTP verification failed');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error during OTP verification:', error);
    throw error;
  }
}; 