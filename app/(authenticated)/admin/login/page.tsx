"use client";
import withAuthRedirect from "@/helpers/with-auth-redirect";
import LoginAgent from "@/theme/components/form/agent-login";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div>
      <LoginAgent />
      <p className="text-center">
        Forgot Password?{" "}
        <Link href={"/admin/signup/reset-password"} className="text-indigo-600">
          Request a new password reset link
        </Link>
      </p>
    </div>
  );
};

export default withAuthRedirect(Page, "/admin/");
