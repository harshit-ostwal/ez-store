import React from "react";
import { trustItems } from "@/constants/trust";
import { Heading } from "../ui/Headings";

function Trust({ isTitleHidden = false }) {
    return (
        <div className="flex flex-col gap-14 items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
                {trustItems.map((trust, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-4">
                        {trust.icon}
                        <div className="flex flex-col gap-2 items-center">
                            <Heading size="h5" className={"font-medium"}>
                                {trust.title}
                            </Heading>
                            <Heading size="p">{trust.description}</Heading>
                        </div>
                    </div>
                ))}
            </div>
            {!isTitleHidden && (
                <Heading size="h4" className="text-center font-semibold">
                    Trusted by over 1,000 customers across the globe
                </Heading>
            )}
        </div>
    );
}

export default Trust;
