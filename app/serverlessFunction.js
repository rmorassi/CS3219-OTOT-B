import axios from "axios";

export async function temp(req, res) {
    try {
        if (!req.query.date_time) return res.send("Missing date time.");
        const response = await axios
            .get(
                "https://api.data.gov.sg/v1/environment/air-temperature?date_time=" + req.query.date_time
            )
        const tempData = response.data
        const data = tempData.items[0].readings;
        var sum = 0;
        data.forEach(function (reading) { sum += reading.value });
        const average = sum / data.length;
        return res.json({
            dataPoints: data.length,
            avg: average
        });
    } catch (err) {
        return res.json({ status: 'error caught', message: err })
    }
}