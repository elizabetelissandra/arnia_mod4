import { formatDateUTC } from "../FormactDateUTF"

describe('FormatDate', () => {
    it('must return a date', () => {
        expect(formatDateUTC('2024-10-02T14:37:39.250Z')).toBe('02/10/2024')
    })

    it('must be such size', () => {
        expect(formatDateUTC('2024-10-02T14:37:39.250Z')).toHaveLength(10)
    })
})