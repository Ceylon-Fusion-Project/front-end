import {useState} from 'react';
import {motion, AnimatePresence} from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";

//Define the types of confirmation props
type ConfirmationProps = {
    title?: string;
    message?: string;
    onConfirm: () => Promise<void> | void;
    onCancel?: () => void;
};

//create useConfirmation Hook
const userConfirmation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentAction, setCurrentAction] = useState<ConfirmationProps | null>(null);

    const requestConfirmation = (action: ConfirmationProps) => {
        setCurrentAction(action);
        setIsOpen(true);
    }

    //trigger when "Confirm" button is clicked
    const handleConfirm = async () => {
        if (currentAction?.onConfirm){
          await currentAction.onConfirm();
        }
        setIsOpen(false);
    };

    //trigger when "Cancel" button is clicked
    const handleCancel = () => {
        currentAction?.onCancel?.();
        setIsOpen(false);
    };

    return {
        requestConfirmation,
        ConfirmationDialog: () => (
            <AnimatePresence>
                {isOpen && currentAction &&(
                    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
                        <Dialog.Portal>
                        <motion.div
                             initial={{ opacity: 0, y: -50 }}
                             animate={{ opacity: 1, y: 0 }}
                             exit={{ opacity: 0, y: -50 }}
                             transition={{ duration: 0.3, ease: "easeInOut" }}
                             className="fixed inset-0 flex items-center justify-center z-[9998]"
                        >   
                            <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]" />
                            <div className="fixed inset-0 flex items-center justify-center z-[9999]">
                            <Dialog.Content className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto z-[9999]">
                                <Dialog.Title className="text-lg font-bold">
                                     {currentAction?.title || "Confirm Action"}
                                </Dialog.Title>
                                <Dialog.Description className="mt-2">
                                    {currentAction?.message || "Are you sure?"}
                                </Dialog.Description>
                                {/* Buttons - Fixed Alignment */}
                                <div className="mt-4 flex justify-between gap-4">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleCancel}
                                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition inline-flex items-center justify-center"
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleConfirm}
                                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition inline-flex items-center justify-center"
                                    >
                                        Confirm
                                    </motion.button>
                                </div>
                            </Dialog.Content>
                            </div>
                        </motion.div>
                        </Dialog.Portal>
                    </Dialog.Root>
                )}
            </AnimatePresence>
        ),
    };
};

export default userConfirmation;