export default async function handler(req, res){
    const response = await fetch ('https://api.apilayer.com/financelayer/news?date=today&keywords=at%26t&sources=seekingalpha.com&keyword=merger&tickers=dis', {
        headers:{
            'apikey': process.env.FINANCELAYER_API_KEY,
        },
        });

        if(response.ok){
            const data = await response.json();
            res.status(200).json(data); 
        }else{
            res.status(response.status).json({error:'Failed to fetch data'})
        }
    }