import React, { useState, useEffect } from "react";
import axios from "axios";
import API_ENDPOINT from '../pages/appConfig'
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    CardBody,
    CardFooter,
    Button
} from "@material-tailwind/react";

const TABLE_HEAD = ["Transaction ID", "UserName", "Desription", "Amount", "Timestamp"];

export function TransactionsTable() {
    const [transactions, setTransactions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const userId = sessionStorage.getItem('userId');

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.post(`${API_ENDPOINT}/api/Transactions/Transactionslist`, { userId });
                setTransactions(response.data);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };

        fetchTransactions();
    }, [userId]);

    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Transactions list
                        </Typography>
                    </div>
                    <div className="w-full md:w-72">
                        <Input
                            label="Search"
                            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0">
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(({ transId, userName, description, amount, timestamp }) => (
                            <tr key={transId}>
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex flex-col">
                                            <Typography variant="small" color="blue-gray" className="font-normal">{transId}</Typography>
                                            <Typography variant="small" color="blue-gray" className="font-normal">{userName}</Typography>
                                            <Typography variant="small" color="blue-gray" className="font-normal">{description}</Typography>
                                            <Typography variant="small" color="blue-gray" className="font-normal">{amount}</Typography>
                                            <Typography variant="small" color="blue-gray" className="font-normal">{timestamp}</Typography>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    Page 1 of 10
                </Typography>
                <div className="flex gap-2">
                    <Button variant="outlined" size="sm">
                        Previous
                    </Button>
                    <Button variant="outlined" size="sm">
                        Next
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
