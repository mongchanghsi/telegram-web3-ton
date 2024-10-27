import { useTonConnectUI, useTonAddress } from "@tonconnect/ui-react";
import Card from "../Shared/Card";
import Button from "../Shared/Button";
import { toGweiTon } from "@/utils/parse";
import { HandleGenericError } from "@/utils/error";

type Transaction = {
  validUntil: number;
  messages: { address: string; amount: string }[];
};

const TRANSFER_AMOUNT = 0.000001;

const SelfTransfer = () => {
  const account = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();

  const transaction: Transaction = {
    validUntil: Math.floor(Date.now() / 1000) + 360,
    messages: [
      {
        address: account,
        amount: String(toGweiTon(TRANSFER_AMOUNT)), // Must be > 0
      },
    ],
  };

  const handleSendTransaction = async () => {
    try {
      await tonConnectUI.sendTransaction(transaction);
      // TODO: Fix response
    } catch (error) {
      const _error = HandleGenericError(error);
      console.log(`SelfTransfer | handleSelfTransaction | Error - `, _error);
    }
  };

  return (
    <Card>
      <Button
        onClick={handleSendTransaction}
        label={`Send your ${TRANSFER_AMOUNT} TON`}
      />
    </Card>
  );
};

export default SelfTransfer;
