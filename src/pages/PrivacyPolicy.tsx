
import { MainLayout } from "@/components/layout/MainLayout";

export default function PrivacyPolicy() {
  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-afro-purple to-afro-gold bg-clip-text text-transparent">Privacy Policy</h1>
        <p className="mb-6 text-gray-700">
          Your privacy is important to us. This Privacy Policy describes how we collect, use, and protect your information when you use our platform.
        </p>
        <h2 className="text-xl font-bold mt-8 mb-2">Information We Collect</h2>
        <ul className="list-disc ml-5 text-gray-700">
          <li>Account registration details (name, email, etc).</li>
          <li>Content you create (roadmaps, tribe posts, profiles, etc).</li>
          <li>Usage and interaction data for improving the platform.</li>
        </ul>
        <h2 className="text-xl font-bold mt-8 mb-2">How We Use Your Information</h2>
        <ul className="list-disc ml-5 text-gray-700">
          <li>To provide and improve platform features.</li>
          <li>To support community guidelines and ensure safety.</li>
          <li>For communication purposes.</li>
        </ul>
        <h2 className="text-xl font-bold mt-8 mb-2">Your Rights</h2>
        <p className="text-gray-700 mb-6">
          You can access, modify, or delete your data at any time. Contact our support for assistance.
        </p>
        <p className="text-gray-500 mb-16">Last updated: April 2025</p>
      </div>
    </MainLayout>
  );
}
