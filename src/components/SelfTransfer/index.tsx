import { shortenAddress } from "@/utils/address";
import { useTonConnectUI, useTonAddress } from "@tonconnect/ui-react";
import Card from "../Shared/Card";
import Button from "../Shared/Button";

type Transaction = {
  validUntil: number;
  messages: { address: string; amount: string }[];
};

const SelfTransfer = () => {
  const account = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();

  const transaction: Transaction = {
    validUntil: Math.floor(Date.now() / 1000) + 360,
    messages: [
      {
        address: account,
        amount: "1000", // Must be > 0
      },
    ],
  };

  const handleSendTransaction = async () => {
    try {
      const response = await tonConnectUI.sendTransaction(transaction);
    } catch (error) {}
  };

  return (
    <Card>
      <Button
        onClick={handleSendTransaction}
        label={"Send your 0.000001 TON"}
      />
    </Card>
  );
};

export default SelfTransfer;
