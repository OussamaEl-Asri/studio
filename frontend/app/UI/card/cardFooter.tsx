import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { Button } from "@/components/ui/button";
import { ArrowUp, Upload } from "lucide-react";

export const Footer = () => {
  return (
    <InputGroup
      className="border border-border-default rounded-[10px] 
      py-7 w-2/3 mt-5 has-[[data-slot=input-group-control]:focus-visible]:ring-3
      has-[[data-slot=input-group-control]:focus-visible]:ring-accent-soft
      has-[[data-slot=input-group-control]:focus-visible]:border-accent-primaryHover"
    >
      <InputGroupInput
        placeholder="type your question"
        className="text-primary placeholder:text-secondary 
      placeholder:text-[16px]"
      />

      {/* sent message */}
      <InputGroupAddon align="inline-end">
        <Button
          className="bg-accent-primary hover:bg-accent-primaryHover
      mr-2"
        >
          <ArrowUp />
        </Button>
      </InputGroupAddon>

      {/* upload files */}
      <InputGroupAddon align="inline-start">
        <Button
          className="bg-card cursor-pointer hover:bg-accent-soft 
      ml-2"
        >
          <Upload color="#64748B" />
        </Button>
      </InputGroupAddon>
    </InputGroup>
  );
};
