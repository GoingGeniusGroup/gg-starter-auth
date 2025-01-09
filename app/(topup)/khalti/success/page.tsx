import React from "react";
import { KhaltiSuccess } from "@/app/components/topupSuccess/khalti-success";
import { notFound } from "next/navigation";
import { handleKhaltiSuccess } from "@/app/actions/khalti";

const KhaltiSuccessPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const transactionId = searchParams.transactionId as string;
  const pidx = searchParams.pidx as string;
  const amount = parseInt(searchParams.amount as string, 10);
  const mobile = searchParams.mobile as string;
  const status = searchParams.status as string;
  const purchase_order_name = searchParams.purchase_order_name as string;

  if (
    !transactionId ||
    !pidx ||
    !amount ||
    !mobile ||
    !status ||
    !purchase_order_name
  ) {
    notFound();
  }

  const result = await handleKhaltiSuccess(
    transactionId,
    pidx,
    amount,
    mobile,
    purchase_order_name,
    status
  );
  console.log("Handling Khalti success:", {
    transactionId,
    pidx,
    amount,
    mobile,
    status,
    purchase_order_name,
  });

  if (!result.success) {
    throw new Error("Error handling khalti payment");
  }

  return (
    <div>
      <KhaltiSuccess topup={result.success ? result.topup : undefined} />
    </div>
  );
};

export default KhaltiSuccessPage;
