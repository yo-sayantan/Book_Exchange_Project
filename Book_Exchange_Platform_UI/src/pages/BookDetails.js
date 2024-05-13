import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import axios from "axios";
import { COMMON_URL } from "../constants/URL";
import { Box, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import { useCookies } from "react-cookie";
import Loading from "../main/Loading";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookDetails = () => {
    const [data, setData] = useState([]);
    //const [dataList, setDataList] = useState([]);
    const [cookies, _setCookie] = useCookies(['access_token']);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [enableEditDeleteBtn, setEnableEditDeleteBtn] = useState(false);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [condition, setCondition] = useState('');
    const [price, setPrice] = useState(0);

    const [id, setId] = useState(null);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                axios.defaults.headers.common['Authorization'] = cookies['access_token'];
                //const marketDataPromise = axios.get(COMMON_URL + "api/get-mf-api-data");
                const dbData = await axios.get(COMMON_URL + "api/books/getAllBooksForAUser");

                //const [marketData, dbData] = await Promise.all([marketDataPromise, dbDataPromise]);

                if (dbData.status === 200 && dbData.data) {
                    //setDataList(marketData.data);
                    setData(dbData.data);
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
        { field: "genre", headerName: "Genre", flex: 1 },
        { field: "condition", headerName: "Condition", flex: 1 },
        { field: "available", headerName: "Avaiable", flex: 1 },
        { field: "price", headerName: "Price", flex: 1 },
    ];

    const handleDialog = () => {
        setDialogOpen(!isDialogOpen);
    };

    const handleDeteleDialog = () => {
        setIsDeleteDialogOpen(!isDeleteDialogOpen);
    }

    const isAnyFieldEmpty = () => {
        return !title || !author || !genre || !condition || !price;
    };

    const handleAdd = () => {
        setIsLoading(true);
        handleDialog();
        axios.defaults.headers.common['Authorization'] = cookies['access_token'];

        const data = {
            id: id,
            title: title,
            author: author,
            genre: genre,
            condition: condition,
            price: price
        };

        axios.post(COMMON_URL + "api/books/addBook", data).then((res) => {
            setIsSaved(true);
            setEnableEditDeleteBtn(false);
        }).catch((error) => {
            toast.error('Failed to add/edit book.', {
                position: toast.POSITION.TOP_RIGHT,
                style: { backgroundColor: 'red', color: '#fff' },
            });
            setIsLoading(false);
        }).finally(() => {
            setId(null);
            setTitle('');
            setAuthor('');
            setGenre('');
            setCondition('');
            setPrice(0);
        })
    };

    const handleChangeStatus = () => {
        setIsLoading(true);
        axios.defaults.headers.common['Authorization'] = cookies['access_token'];

        const data = {
            id: id,
        };

        axios.post(COMMON_URL + "api/books/changeStatus", data).then((res) => {
            setIsSaved(true);
            setEnableEditDeleteBtn(false);
        }).catch((error) => {
            console.error('userinfo failed:', error);
            setIsLoading(false);
        }).finally(() => {
            setId(null);
            setTitle('');
            setAuthor('');
            setGenre('');
            setCondition('');
            setPrice(0);
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
                        <h1>Book Info</h1>
                        {<div>
                            <Button
                                variant="contained"
                                onClick={handleDialog}
                                style={{ marginRight: 10 }}
                                disabled={enableEditDeleteBtn}
                            >
                                Add
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={!enableEditDeleteBtn}
                                onClick={handleDialog}
                                style={{ marginRight: 10 }}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                disabled={!enableEditDeleteBtn}
                                onClick={handleChangeStatus}
                            >
                                Change Status
                            </Button>
                        </div>
                        }
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
                        onRowSelectionModelChange={(newSelection) => {
                            if (newSelection.length == 1) {
                                const selectedData = data.find(item => item.id === newSelection[0]);
                                setId(selectedData.id);
                                setTitle(selectedData.title);
                                setAuthor(selectedData.author);
                                setGenre(selectedData.genre);
                                setCondition(selectedData.condition);
                                setPrice(selectedData.price);
                                setEnableEditDeleteBtn(true);
                            }
                            else {
                                setId(null);
                                setTitle('');
                                setAuthor('');
                                setGenre('');
                                setCondition('');
                                setPrice(0);
                                setEnableEditDeleteBtn(false);
                            }
                        }}
                    />
                </>}
            <Dialog open={isDialogOpen} onClose={handleDialog}>
                <DialogTitle>Publish Book</DialogTitle>
                <DialogContent>
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Title</InputLabel>
                                    <OutlinedInput
                                        label="Title"
                                        type="string"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Author</InputLabel>
                                    <OutlinedInput
                                        label="Author"
                                        type="string"
                                        value={author}
                                        onChange={(e) => setAuthor(e.target.value)}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Genre</InputLabel>
                                    <OutlinedInput
                                        label="Genre"
                                        type="string"
                                        value={genre}
                                        onChange={(e) => setGenre(e.target.value)}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Condition</InputLabel>
                                    <OutlinedInput
                                        label="Conditon"
                                        type="string"
                                        value={condition}
                                        onChange={(e) => setCondition(e.target.value)}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Price</InputLabel>
                                    <OutlinedInput
                                        label="Price"
                                        type="number"
                                        value={price}
                                        onChange={(e) => {
                                            const inputValue = e.target.value;
                                            if (/^\d*$/.test(inputValue)) {
                                                setPrice(inputValue);
                                            }
                                        }}
                                    //disabled
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <Box display="flex" justifyContent="flex-end">
                                    <Button variant="contained" color="primary" onClick={handleAdd} disabled={isAnyFieldEmpty()}>
                                        Add
                                    </Button>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box display="flex" justifyContent="flex-start">
                                    <Button variant="contained" color="secondary" onClick={handleDialog}>
                                        Cancel
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default BookDetails;
