import { readFileSync } from 'fs'

export default defineEventHandler(() => {
  const raw = readFileSync('./server/data/news.json', 'utf-8')
  const content = JSON.parse(raw)
  const main = {
    ...content.main,
    desktop_figure: `/images/${content.main.desktop_figure}`,
    mobile_figure: `/images/${content.main.mobile_figure}`
  }
  const card = content.card.map((item: any) => ({
    ...item,
    figure: `/images/${item.figure}`
  }))
  return {
    main,
    card,
    new: content.new
  }
})
