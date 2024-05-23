import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "@/pages/contact/features/components/form";

describe("ContactForm", () => {
  it("renders all form inputs", () => {
    render(<ContactForm />);
    expect(screen.getByPlaceholderText("First Name*")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last Name*")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email*")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Phone*")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Message*")).toBeInTheDocument();
  });

  it("allows input fields to be filled in", async () => {
    render(<ContactForm />);
    const firstNameInput = screen.getByPlaceholderText("First Name*");
    const lastNameInput = screen.getByPlaceholderText("Last Name*");
    const emailInput = screen.getByPlaceholderText("Email*");
    const phoneInput = screen.getByPlaceholderText("Phone*");
    // const messageTextArea = screen.getByPlaceholderText("Message*");

    await userEvent.type(firstNameInput, "John");
    await userEvent.type(lastNameInput, "Doe");
    await userEvent.type(emailInput, "john.doe@example.com");
    await userEvent.type(phoneInput, "1234567890");
    // await userEvent.type(messageTextArea, "Hello, this is a test message.");

    expect(firstNameInput).toHaveValue("John");
    expect(lastNameInput).toHaveValue("Doe");
    expect(emailInput).toHaveValue("john.doe@example.com");
    expect(phoneInput).toHaveValue("1234567890");
    // expect(messageTextArea).toHaveValue("Hello, this is a test message.");
  });

  it("calls the submit function when the form is submitted", async () => {
    render(<ContactForm />);
    const form = screen.getByTestId("contact-form");
    const submitButton = screen.getByText("Send Message");

    // Mock function to replace the console.log in handleSubmit
    const consoleSpy = jest.spyOn(console, "log");
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });
  });
});
