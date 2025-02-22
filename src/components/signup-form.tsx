import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useSignup from "@/hooks/use-signup"; // Import the hook

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const { signup, isLoading, error, isSuccess } = useSignup();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Call the signup function from the hook
    const response = await signup(
      name,
      email,
      username,
      password,
      verifyPassword
    );

    if (response.status === "ok") {
      console.log("Signup successful! User ID:", response.u_id);
      navigate("/login");
    } else {
      console.error("Signup failed:", response.error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Welcome to uplift. Get started today.</CardTitle>
          <CardDescription>Enter your information below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {/* Grid Layout */}
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-8">
                {/* Name Field */}
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* Email Field */}
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="user@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Username Field */}
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="johndoe"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Password Field */}
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {/* Verify Password Field */}
                <div>
                  <Label htmlFor="verifyPassword">Verify Password</Label>
                  <Input
                    id="verifyPassword"
                    type="password"
                    required
                    value={verifyPassword}
                    onChange={(e) => setVerifyPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <Button
                type="submit"
                className="w-full text-zinc-800 bg-zinc-200"
                disabled={isLoading}
              >
                {isLoading ? "Signing up..." : "Sign Up"}
              </Button>
            </div>

            {/* Error Message */}
            {error && (
              <p className="mt-4 text-center text-sm text-red-500">{error}</p>
            )}

            {/* Success Message */}
            {isSuccess && (
              <p className="mt-4 text-center text-sm text-green-500">
                Signup successful!
              </p>
            )}

            {/* Login Link */}
            <div className="mt-4 text-center text-sm">
              Have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                <Link to="/login">Login</Link>
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}