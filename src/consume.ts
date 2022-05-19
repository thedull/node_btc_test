import btcStats from '@thedull/btc-stats';

const startDate = process.argv[2];
const endDate = process.argv[3];

(async () => {
    const btcData = await btcStats(startDate, endDate);
    console.log(btcData);
})();