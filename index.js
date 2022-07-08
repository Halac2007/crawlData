import * as cheerio from 'cheerio'
import fetch from 'node-fetch'
import express from 'express'

const app = express()

app.get('/', async (req, res) => {
  try {
    const response = await fetch('https://plo.vn/an-sach-song-khoe/')
    const body = await response.text()
    const $ = cheerio.load(body)
    const article = []
    $('.story').map((i, el) => {
      const title = $(el).text().trim().replace(/\n/g, '')
      const link = $(el).find('a').attr('href')
      const photo =
        $(el).find('img').attr('data-src') || 'https://photo-cms-plo.zadn.vn/600x360/Uploaded/2022/pwvotwiv/2022_05_30/4-dad4-451.jpg'
      article.push({
        title,
        // rank,
        link,
        photo,
      })
    })
    res.json(article)
  } catch (err) {
    console.log(err)
  }
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`server ${port}`)
})
