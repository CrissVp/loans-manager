import { getLoanById } from "@/services/loans";
import { useEffect, useState } from "react";
import { FetchState, Loan } from "@/types";

export default function useLoan(id: string) {
    const [state, setState] = useState<FetchState<Loan>>({
        data: null,
        isLoading: true,
        error: undefined
    });

    useEffect(() => {
        const getLoan = async () => {
            try {
                const result = await getLoanById(id);
                setState({
                    data: result,
                    isLoading: false,
                    error: undefined
                });
            } catch (error: unknown) {
                setState({
                    data: null,
                    isLoading: false,
                    error: 'Something went wrong retrieving information of loan.'
                });
            }
        }

        getLoan();
    }, [id]);

    return state;
}