import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { resolve, join, basename } from 'node:path'
import { geocodeCity } from './geocode'
import { getMemberCoordinates } from '../src/utils/member-coords'

const membersDir = resolve(import.meta.dirname!, '..', 'members')
const files = readdirSync(membersDir).filter((f) => f.endsWith('.json'))

let updated = 0

for (const file of files) {
  const slug = basename(file, '.json')
  const filePath = join(membersDir, file)
  const member = { slug, ...JSON.parse(readFileSync(filePath, 'utf-8')) }

  if (getMemberCoordinates(member)) {
    continue
  }

  if (!member.city) {
    process.stderr.write(`Skipping ${slug}: no city or coordinates available.\n`)
    continue
  }

  const coords = await geocodeCity(member.city)
  if (!coords) {
    process.stderr.write(`Could not resolve ${slug} (${member.city}). Add lat/lng manually.\n`)
    continue
  }

  const data = JSON.parse(readFileSync(filePath, 'utf-8'))
  data.lat = coords.lat
  data.lng = coords.lng
  writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n')
  updated += 1
  process.stdout.write(`Resolved ${slug} (${member.city}) -> ${coords.lat}, ${coords.lng}\n`)
}

process.stdout.write(updated > 0
  ? `Updated coordinates for ${updated} member${updated === 1 ? '' : 's'}.\n`
  : 'No member coordinates needed updates.\n')
