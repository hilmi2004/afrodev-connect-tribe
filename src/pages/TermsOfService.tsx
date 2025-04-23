
import { MainLayout } from "@/components/layout/MainLayout";

export default function TermsOfService() {
  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-afro-purple to-afro-gold bg-clip-text text-transparent">Terms of Service</h1>
        <p className="mb-6 text-gray-700">
          By using this platform, you agree to our rules and guidelines. Please read the following terms carefully.
        </p>
        <h2 className="text-xl font-bold mt-8 mb-2">Use of Service</h2>
        <ul className="list-disc ml-5 text-gray-700">
          <li>Respect other users and communities on the platform.</li>
          <li>Content that is illegal or abusive is strictly prohibited.</li>
          <li>Do not share your account credentials.</li>
        </ul>
        <h2 className="text-xl font-bold mt-8 mb-2">Intellectual Property</h2>
        <p className="text-gray-700 mb-6">
          All roadmaps, posts, and media belong to their respective creators. Reuse or distribution requires permission.
        </p>
        <h2 className="text-xl font-bold mt-8 mb-2">Termination</h2>
        <p className="text-gray-700 mb-6">
          We reserve the right to terminate access for violations of these terms.
        </p>
        <p className="text-gray-500 mb-16">Last updated: April 2025</p>
      </div>
    </MainLayout>
  );
}
