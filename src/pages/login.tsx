import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Login() {

    return (
      <div>
        <h1>This is login!</h1>
        <Label>Login</Label>
        <Input
          className="bg-light-gray placeholder:text-dark-gray dark:bg-darker-gray dark:placeholder:text-light-gray"
					placeholder="email"/>
        <Label>Password</Label>
          <Input
          className="bg-light-gray placeholder:text-dark-gray dark:bg-darker-gray dark:placeholder:text-light-gray"
					placeholder="password"
          type="password"/>
          <Button>Login</Button>
        </div>
    )
  }
  