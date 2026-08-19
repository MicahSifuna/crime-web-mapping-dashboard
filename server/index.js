require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

app.get("/api/counties", async (req, res) => {
  try {
    const result = await pool.query(`
        SELECT json_build_object(
            'type', 'FeatureCollection',
            'features', COALESCE(json_agg(
                json_build_object(
                    'type', 'Feature',
                    'geometry', ST_AsGeoJSON(c.geom)::json,
                    'properties', json_build_object(
                        'county', c."counties",
                        'homicide', c.homicide,
                        'drugs', c.drugs,
                        'robbery', c.robbery,
                        'assault', c.stealing,
                        'breaking', c.breakings
                    )
                )
            ), '[]'::json)
        ) AS geojson
        FROM crime c
        WHERE c.geom IS NOT NULL;
    `);

    res.json(result.rows[0].geojson);
  } catch (error) {
    console.error("FULL ERROR", error);
    res.status(500).json({ error: error.message });
  }
});
