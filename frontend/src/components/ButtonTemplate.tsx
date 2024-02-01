import Button from '@mui/material/Button'

function ButtonUsage() {
    return (
    <Button 
        variant='contained'
        onClick={() => console.log("hello world")}
    >
        Refresh
    </Button>)
}

export default ButtonUsage