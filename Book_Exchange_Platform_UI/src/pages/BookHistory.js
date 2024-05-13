import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { COMMON_URL } from "../constants/URL";
import { Box } from "@mui/material";
import { useCookies } from "react-cookie";
import Loading from "../main/Loading";
import dayjs from 'dayjs';

const BookHistory = () => {
    const [data, setData] = useState([]);
    //const [dataList, setDataList] = useState([]);
    const [cookies, _setCookie] = useCookies(['access_token']);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                axios.defaults.headers.common['Authorization'] = cookies['access_token'];
                //const marketDataPromise = axios.get(COMMON_URL + "api/get-mf-api-data");
                const dbData = await axios.get(COMMON_URL + "api/getAllExchangeRequests");

                //const [marketData, dbData] = await Promise.all([marketDataPromise, dbDataPromise]);

                if (dbData.status === 200 && dbData.data) {
                    const flattenedData = dbData.data.map(resq => ({
                        ...resq,
                        title: resq.requestedBook.title,
                        author: resq.requestedBook.author,
                        condition: resq.requestedBook.condition,
                        price: resq.requestedBook.price,
                        requestBy: resq.requestingUser.fullname,
                        ownedBy: resq.ownerUser === null ? "" : resq.ownerUser.fullname
                    }));
                    setData(flattenedData);
                    setIsLoading(false);
                    setIsSaved(false);
                }
            }
            catch (error) {
                // Handle errors if any of the API calls fail
                console.error('Error calling one or more APIs', error);
            }
        };
        fetchData();
    }, [isSaved]);

    const columns = [
        { field: "title", headerName: "Title", flex: 1 },
        { field: "author", headerName: "Author", flex: 1 },
        { field: "condition", headerName: "Condition", flex: 1 },
        { field: "price", headerName: "Price", flex: 1 },
        { field: "ownedBy", headerName: "Owned By", flex: 1 },
        { field: "requestBy", headerName: "Requested By", flex: 1 },
        { field: "status", headerName: "Status", flex: 1 },
        { field: "transaction_type", headerName: "Type", flex: 1 },
        {
            field: "updatedAt",
            headerName: "Update Time",
            flex: 1,
            valueFormatter: (params) => dayjs(params.value).format('DD-MMM-YYYY hh:mm a')
        }

    ];

    return (
        <Box sx={{ width: "100%", paddingTop: 6 }}>
            {isLoading ?
                <>
                    <Loading />
                </> :
                <>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
                        <h1>Transaction History</h1>
                    </div>

                    <DataGrid
                        autoHeight
                        rows={data}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                    />
                </>}
        </Box>
    );
};

export default BookHistory;
