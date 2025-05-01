
import React from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { RegistrationFlow } from "@/components/auth/RegistrationFlow";
import { Card, CardContent } from "@/components/ui/card";

const Register = () => {
  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-afro-purple/10 to-transparent min-h-[85vh] py-12">
        <div className="max-w-5xl mx-auto px-6">
          <Card className="shadow-xl border-afro-purple/10 overflow-hidden">
            <div className="bg-gradient-to-r from-afro-purple/10 to-afro-gold/5 p-6 flex justify-between items-center border-b border-afro-purple/10">
              <div>
                <h1 className="text-3xl font-bold">Join AfroDevConnect</h1>
                <p className="text-gray-600">Create your account to start collaborating with African developers</p>
              </div>
              <div>
                <Link to="/login" className="text-afro-purple hover:underline text-sm">
                  Already have an account? Sign in →
                </Link>
              </div>
            </div>
            
            <CardContent className="p-8">
              <RegistrationFlow />
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Register;
