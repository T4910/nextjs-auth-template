"use client"
import { newVerification } from "@/actions/newVerification";
import { CardWrapper } from "@/components/cardWrapper"
import { Loaders } from "@/components/loaders"
import { useSearchParams } from "next/navigation"
import { useEffect, useCallback, useState } from "react";
import Flash, { type formFlashProps } from "@/components/auth/formFlash"

type newVerificationReturn = ((state: formFlashProps) => formFlashProps) | Promise<formFlashProps>;

export function EmailVerification() {
  const searchParams = useSearchParams();
  const token = searchParams.get("code") as string;

  const [result, setResult] = useState<formFlashProps>({});

  const verify = useCallback(() => newVerification(token), []);
  useEffect(() => {
    verify()
    .then(async result => {
      console.log(result);
      return setResult(result);
    })
  }, []);

  return (
    <CardWrapper
        headerLabel="Confirm Email"
        backBtnLabel="Back to Login"
        backBtnHref="/login"
    >
        <div className="text-center space-y-4">
          {
            (!(!!result?.type)) ? ( 
              <>
                <p>Verifying Email...</p>
                <Loaders /> 
              </>
            ) : (
              <>
                <Flash {...result} loading={(result?.type === 'success')}/>
                {(result?.type === 'success') && <Loaders type="Clip" />}
              </>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
            )
          }
        </div>
    </CardWrapper>
  )
}