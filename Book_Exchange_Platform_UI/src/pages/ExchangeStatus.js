import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import axios from "axios";
import { COMMON_URL } from "../constants/URL";
import { Box, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, Typography } from "@mui/material";
import { useCookies } from "react-cookie";
import Loading from "../main/Loading";
import { useSelector } from "react-redux";

const ExchangeStatus = () => {
    const [data, setData] = useState([]);
    const [pendingData, setPendingData] = useState([]);
    //const [dataList, setDataList] = useState([]);
    const [cookies, _setCookie] = useCookies(['access_token']);
    const [isLoading, setIsLoading] = useState(true);
    const [enableEditDeleteBtn, setEnableEditDeleteBtn] = useState(false);
    const [id, setId] = useState(null);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                axios.defaults.headers.common['Authorization'] = cookies['access_token'];
                //const marketDataPromise = axios.get(COMMON_URL + "api/get-mf-api-data");
                const dbDataSentReq = await axios.get(COMMON_URL + "api/getAllRequestsForAUser");
                const dbDataPendingReq = await axios.get(COMMON_URL + "api/getAllRequestsFromUser");

                //const [marketData, dbData] = await Promise.all([marketDataPromise, dbDataPromise]);

                if (dbDataSentReq.status === 200 && dbDataSentReq.data && dbDataPendingReq.status === 200 && dbDataPendingReq.data) {
                    const flattenedSentData = dbDataSentReq.data.map(pReq => ({
                        ...pReq,
                        title: pReq.requestedBook.title,
                        author: pReq.requestedBook.author,
                        condition: pReq.requestedBook.condition
                    }));
                    const flattenedPendingData = dbDataPendingReq.data.map(pReq => ({
                        ...pReq,
                        mybook: pReq.requestedBook.title,
                        title: pReq.exchangedBook.title,
                        author: pReq.exchangedBook.author,
                        genre: pReq.exchangedBook.genre,
                        condition: pReq.exchangedBook.condition
                    }));
                    setData(flattenedSentData);
                    setPendingData(flattenedPendingData);
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

    const columnsForSentRequest = [
        { field: "title", headerName: "Title", flex: 1 },
        { field: "author", headerName: "Author", flex: 1 },
        { field: "condition", headerName: "Condition", flex: 1 },
        { field: "status", headerName: "Status", flex: 1 },
        { field: "transaction_type", headerName: "Type", flex: 1}
    ];

    const columnsForPendingRequest = [
        { field: "mybook", headerName: "My Book", flex: 1},
        { field: "title", headerName: "Exchange Book", flex: 1 },
        { field: "author", headerName: "Author", flex: 1 },
        { field: "genre", headerName: "Genre", flex: 1 },
        { field: "condition", headerName: "Condition", flex: 1 },
    ];

    const handleApprove = (status) => {
        setIsLoading(true);
        axios.defaults.headers.common['Authorization'] = cookies['access_token'];

        const data = {
            exchangeId: id,
            status: status,
        };

        axios.post(COMMON_URL + "api/updateExchangeRequest", data).then((res) => {
            setIsSaved(true);
            setEnableEditDeleteBtn(false);
        }).catch((error) => {
            console.error('userinfo failed:', error);
            setIsLoading(false);
        }).finally(() => {
            setId(null);
        })
    };

    return (
        <Box sx={{ width: "100%", paddingTop: 6 }}>
            {isLoading ?
                <>
                    <Loading />
                </> :
                <>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
                        <h1>Exchange Status</h1>
                    </div>

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="h6" gutterBottom component="div">
                                Sent Requests
                            </Typography>
                            <DataGrid
                                autoHeight
                                rows={data}
                                columns={columnsForSentRequest}
                                pageSize={5}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Pending Requests
                                </Typography>
                                <div>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disabled={!enableEditDeleteBtn}
                                        onClick={()=>handleApprove(1)}
                                        style={{ marginRight: 10 }}
                                    >
                                        Approve
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        disabled={!enableEditDeleteBtn}
                                        onClick={()=>handleApprove(0)}
                                    >
                                        Reject
                                    </Button>
                                </div>
                            </div>
                            <DataGrid
                                autoHeight
                                rows={pendingData}
                                columns={columnsForPendingRequest}
                                pageSize={5}
                                onRowSelectionModelChange={(newSelection) => {
                                    if (newSelection.length === 1) {
                                        const selectedData = pendingData.find((item) => item.id === newSelection[0]);
                                        setId(selectedData.id);
                                        setEnableEditDeleteBtn(true);
                                    } else {
                                        setId(null);
                                        setEnableEditDeleteBtn(false);
                                    }
                                }}
                            />
                        </Grid>
                    </Grid>
                </>}
        </Box>
    );
};

export default ExchangeStatus;
