import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import axios from "axios";
import { COMMON_URL } from "../constants/URL";
import { Box, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material";
import { useCookies } from "react-cookie";
import Loading from "../main/Loading";
import { useSelector } from "react-redux";

const ExchangeBook = () => {
    const [data, setData] = useState([]);
    //const [dataList, setDataList] = useState([]);
    const [cookies, _setCookie] = useCookies(['access_token']);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [enableEditDeleteBtn, setEnableEditDeleteBtn] = useState(false);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [condition, setCondition] = useState('');
    const [price, setPrice] = useState(0);

    const [id, setId] = useState(null);
    const [isSaved, setIsSaved] = useState(false);
    const userData = useSelector(state => state.login);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedAction, setSelectedAction] = useState('');
    const [bookOptions, setBookOptions] = useState([]);
    const [exchangedBookId, setExchangedBookId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                axios.defaults.headers.common['Authorization'] = cookies['access_token'];
                //const marketDataPromise = axios.get(COMMON_URL + "api/get-mf-api-data");
                console.log(userData);
                const dbData = await axios.get(COMMON_URL + "api/books/getAllAvailableBooks");
                const dbDataOptions = await axios.get(COMMON_URL + "api/books/getAllBooksForAUser");

                //const [marketData, dbData] = await Promise.all([marketDataPromise, dbDataPromise]);

                if (dbData.status === 200 && dbData.data && dbDataOptions.status === 200 && dbDataOptions.data) {
                    //setDataList(marketData.data);
                    const flattenedData = dbData.data.map(book => ({
                        ...book,
                        ownerFullName: book.owner.fullname // Flatten the owner's full name
                    }));
                    setData(flattenedData);
                    setBookOptions(
                        dbDataOptions.data
                            .filter(book => book.available) // Filter out only available books
                            .map(book => ({
                                value: book.id,
                                label: book.title
                            }))
                    );
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
        { field: "ownerFullName", headerName: "Owner", flex: 1 },
        { field: "price", headerName: "Price", flex: 1 },
    ];

    const handleDialog = (action) => {
        setSelectedAction(action);
        if (action === 'Rent' || action === 'Exchange')
            console.log(action);
        else
            console.log('');
        setDialogOpen(!isDialogOpen);
    };

    const handlePay = () => {
        setIsLoading(true);
        handleDialog('');
        axios.defaults.headers.common['Authorization'] = cookies['access_token'];

        const data = {
            id: id,
            exchangeId: exchangedBookId,
        };

        axios.post(COMMON_URL + "api/rentBook", data).then((res) => {
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

    const filteredData = data.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.condition.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box sx={{ width: "100%", paddingTop: 6 }}>
            {isLoading ?
                <>
                    <Loading />
                </> :
                <>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
                        <h1>Exchange/Rent</h1>
                        {<div>
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={!enableEditDeleteBtn}
                                onClick={() => handleDialog('Rent')}
                                style={{ marginRight: 10 }}
                            >
                                Rent
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                disabled={!enableEditDeleteBtn}
                                onClick={() => handleDialog('Exchange')}
                            >
                                Exchange
                            </Button>
                        </div>
                        }
                    </div>

                    <TextField
                        label="Search By Title, Author, Genre"
                        variant="outlined"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        fullWidth
                        style={{ marginBottom: 20 }}
                    />

                    <DataGrid
                        autoHeight
                        rows={filteredData}
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
                <DialogTitle>{selectedAction + ` Book`}</DialogTitle>
                <DialogContent>
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <InputLabel>Title</InputLabel>
                                <Typography>{title}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel>Author</InputLabel>
                                <Typography>{author}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel>Genre</InputLabel>
                                <Typography>{genre}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel>Condition</InputLabel>
                                <Typography>{condition}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel>Price</InputLabel>
                                <Typography>{`INR ` + price}</Typography>
                            </Grid>

                            {selectedAction === 'Exchange' && (
                                <Grid item xs={12}>
                                    <InputLabel>Select Book</InputLabel>
                                    <FormControl fullWidth variant="outlined">
                                        <Select
                                            value={exchangedBookId}
                                            onChange={(e) => setExchangedBookId(e.target.value)}
                                            label="Select Book for Exchange"
                                        >
                                            {bookOptions.map(book => (
                                                <MenuItem key={book.value} value={book.value}>
                                                    {book.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            )}
                            <Grid item xs={6}>
                                <Box display="flex" justifyContent="flex-end">
                                    <Button variant="contained" color="primary" onClick={handlePay}>
                                        {selectedAction}
                                    </Button>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box display="flex" justifyContent="flex-start">
                                    <Button variant="contained" color="secondary" onClick={() => handleDialog('')}>
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

export default ExchangeBook;
