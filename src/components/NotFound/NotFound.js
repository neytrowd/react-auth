import {Box, Container, CssBaseline, Typography} from "@material-ui/core";

const NotFound = () => {
    return (
        <Container component="main" maxWidth="md">
            <CssBaseline/>
            <Box marginTop={20}>
                <Typography variant={'h1'} align={'center'}>
                    404 Not Found
                </Typography>
            </Box>
        </Container>
    )
}

export default NotFound;