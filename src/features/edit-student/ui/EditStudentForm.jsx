import { useState, useEffect } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { DialogFooter } from "@/shared/ui/dialog";
import { toast } from "sonner";

export function EditStudentForm({ student, onSubmit, onCancel }) {
  const [prefix, setPrefix] = useState("");
  const [customPrefix, setCustomPrefix] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    if (student) {
      setPrefix(student.prefix);
      setFirstName(student.firstName);
      setLastName(student.lastName);
      setEmail(student.email);
      setMobile(student.mobile);
    }
  }, [student]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !mobile || !prefix) {
      toast.error("Missing Fields", {
        description: "Please fill in all required fields.",
      });
      return;
    }

    if (prefix === "Other" && !customPrefix) {
      toast.error("Custom Prefix Required", {
        description: "Please enter a custom prefix.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid Email", {
        description: "Please enter a valid email address.",
      });
      return;
    }

    const mobileRegex = /^09\d{9}$/;
    if (!mobileRegex.test(mobile)) {
      toast.error("Invalid Mobile Number", {
        description: "Please enter a valid Philippine mobile number (09XXXXXXXXX).",
      });
      return;
    }

    const finalPrefix = prefix === "Other" ? customPrefix : prefix;
    const updatedData = { prefix: finalPrefix, firstName, lastName, email, mobile };

    onSubmit(updatedData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      {/* Prefix Dropdown */}
      <div className="space-y-2">
        <Label htmlFor="prefix">
          Prefix <span className="text-destructive">*</span>
        </Label>
        <Select value={prefix} onValueChange={setPrefix}>
          <SelectTrigger id="prefix">
            <SelectValue placeholder="Select prefix" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Mr.">Mr.</SelectItem>
            <SelectItem value="Ms.">Ms.</SelectItem>
            <SelectItem value="Mrs.">Mrs.</SelectItem>
            <SelectItem value="Dr.">Dr.</SelectItem>
            <SelectItem value="Prof.">Prof.</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Custom Prefix Input */}
      {prefix === "Other" && (
        <div className="space-y-2 animate-in slide-in-from-top-2">
          <Label htmlFor="customPrefix">
            Custom Prefix <span className="text-destructive">*</span>
          </Label>
          <Input
            id="customPrefix"
            value={customPrefix}
            onChange={(e) => setCustomPrefix(e.target.value)}
            placeholder="Enter custom prefix (e.g., Mx., Rev.)"
            autoFocus
          />
        </div>
      )}

      {/* First Name */}
      <div className="space-y-2">
        <Label htmlFor="firstName">
          First Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter first name"
        />
      </div>

      {/* Last Name */}
      <div className="space-y-2">
        <Label htmlFor="lastName">
          Last Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter last name"
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">
          Email <span className="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="student@example.com"
        />
      </div>

      {/* Mobile */}
      <div className="space-y-2">
        <Label htmlFor="mobile">
          Mobile Number <span className="text-destructive">*</span>
        </Label>
        <Input
          id="mobile"
          type="tel"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="Enter mobile number"
          maxLength="11"
        />
        <p className="text-xs text-muted-foreground">Format: 09XXXXXXXXX</p>
      </div>

      {/* Footer */}
      <DialogFooter className="gap-2 sm:gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Changes</Button>
      </DialogFooter>
    </form>
  );
}
