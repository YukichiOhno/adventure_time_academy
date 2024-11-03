import axios from "axios";

export const noToken = async () => {
    try {
        const response = await axios.get('/api/account/no-token');

        return true;
    } catch (err) {
        console.error('an error occured in no-token script');
        console.error(err);
        return false;
    }
}