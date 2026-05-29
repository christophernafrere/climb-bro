import { Button } from "@/layouts/button";
import Popup from "@/layouts/popup";

export default function PopupAskJoin({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    return (
        <Popup
            style={{
                width: "60%",
                flexDirection: "column",
                color: "black",
                justifyContent: "space-between",
                textAlign: "center",
                gap: "8px",
            }}
            isOpen={isOpen}
            onClose={onClose}>
            <h5>Envoyer la demande</h5>
            <p>
                En envoyant cette demande, vous proposez à votre ami de
                rejoindre la séance. Votre ami recevra une notification et
                pourra accepter ou refuser votre invitation.
            </p>
            <Button color="primary" onClick={onClose}>
                Confirmer et demander
            </Button>
            <Button color="secondary" onClick={onClose}>
                Annuler
            </Button>
        </Popup>
    );
}
