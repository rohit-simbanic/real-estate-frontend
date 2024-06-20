export interface MailPayloadType {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export const validate = (formData: MailPayloadType) => {
  const newErrors: Partial<MailPayloadType> = {};

  if (!formData.firstName) {
    newErrors.firstName = "First Name is required";
  }
  if (!formData.lastName) {
    newErrors.lastName = "Last Name is required";
  }
  if (!formData.email) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "Email is invalid";
  }
  if (!formData.phone) {
    newErrors.phone = "Phone number is required";
  } else if (!/^\d{10}$/.test(formData.phone)) {
    newErrors.phone = "Phone number is invalid";
  }
  if (!formData.message) {
    newErrors.message = "Message is required";
  }

  return {
    isValid: Object.keys(newErrors).length === 0,
    errors: newErrors,
  };
};
