import { AlertDialog, Button } from "@heroui/react";
import type { TDeleteBandProps } from "../../types/admin.band.types";

export function DeleteBandBtn({
  bandName,
  onConfirm,
}: TDeleteBandProps) {
  return (
    <AlertDialog>
      <AlertDialog.Trigger>
        <Button type="button" variant="danger-soft">
          Delete
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Backdrop>
        <AlertDialog.Container placement="center">
          <AlertDialog.Dialog>
            {({ close }) => (
              <>
                <AlertDialog.Header>
                  <AlertDialog.Icon status="danger" />
                  <AlertDialog.Heading>Delete band?</AlertDialog.Heading>
                </AlertDialog.Header>

                <AlertDialog.Body>
                  Do you really want to delete {bandName}? This action cannot
                  be undone.
                </AlertDialog.Body>

                <AlertDialog.Footer>
                  <Button type="button" variant="secondary" onPress={close}>
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    variant="danger-soft"
                    onPress={() => {
                      onConfirm();
                      close();
                    }}
                  >
                    Delete
                  </Button>
                </AlertDialog.Footer>
              </>
            )}
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
