import { ITspResult, ITspStop } from '../lib/interfaces'
import { solve } from '../tspwc'
import { stops } from './test-data'

const initialTime: Date = stops[0].startTime || new Date()
const description: string = 'Getting paths for 8 stops from ' + stops[0].id + ' to ' + stops[stops.length - 1].id
console.time(description)
const solutions = solve(stops, initialTime, 100)
console.timeEnd(description)
console.log('Number of solutions found', solutions.length)

console.log('Solution length', (solutions[0] as ITspResult).path.length)
console.log('Shortest valid trip', (solutions[0] as ITspResult).cost)
console.log('Longest valid trip', (solutions[solutions.length - 1] as ITspResult).cost)

console.log('Path', (solutions[0] as ITspResult).path)
console.log(JSON.stringify(solutions, null, 2))
