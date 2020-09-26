import { Router } from 'express'
import { getCustomRepository } from 'typeorm'
import {
  KettleRepository,
  ScheduleRepository,
  SettingsRepository,
} from './repository'
import { asyncHandler } from './utils/asyncHandler'
export const router = Router()

/**
 * List Kettles
 */
router.get(
  '/kettle',
  asyncHandler(async (req, res) => {
    const repo = getCustomRepository(KettleRepository)
    const kettles = await repo.find()
    res.json(kettles)
  }),
)

/**
 * Add Kettle
 */
router.post(
  '/kettle',
  asyncHandler(async (req, res) => {
    const repo = getCustomRepository(KettleRepository)
    const { macAddress, name } = req.body

    if (!macAddress) {
      res.status(422).json({ error: 'macAddress is required.' })
    }

    if (!name) {
      res.status(422).json({ error: 'name is required.' })
    }
    const kettle = await repo.create({
      macAddress,
      name,
    })
    res.json(kettle)
  }),
)

/**
 * Get Single Kettle
 */
router.get(
  '/kettle/:id',
  asyncHandler(async (req, res) => {
    const repo = getCustomRepository(KettleRepository)
    const kettle = await repo.findById(req.params.id)
    if (!kettle) {
      return res.status(404).json({ error: 'no kettle found' })
    }
    res.json(kettle)
  }),
)

/**
 * Update Kettle
 */
router.patch(
  '/kettle/:id',
  asyncHandler(async (req, res) => {
    //const repo = getRep(KettleRepository)
    //const kettle = repo.repo
    res.json({})
  }),
)

/**
 * Delete Kettle
 */
router.delete(
  '/kettle/:id',
  asyncHandler(async (req, res) => {
    const repo = getCustomRepository(KettleRepository)
    const result = await repo.deleteById(req.params.id)
    res.json(result)
  }),
)

/**
 * Add Schedule Item
 */
router.post(
  '/kettle/:id/schedule',
  asyncHandler(async (req, res) => {
    const { id } = req.params
    const { name, timeOn, timeOff, days, temperature } = req.body
    const scheduleRepo = getCustomRepository(ScheduleRepository)
    const kettleRepo = getCustomRepository(KettleRepository)
    const schedule = await scheduleRepo.create({
      name,
      timeOff,
      timeOn,
      days,
      temperature,
    })
    const kettle = await kettleRepo.addSchedule(id, schedule)
    res.json(kettle)
  }),
)

/**
 * Update Schedule Item
 */

router.get(
  '/schedule/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params
    const repo = getCustomRepository(ScheduleRepository)
    const kettle = await repo.findById(id)
    res.json(kettle)
  }),
)

router.patch(
  '/schedule/:id',
  asyncHandler(async (req, res) => {
    res.json({})
  }),
)

router.delete(
  '/schedule/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params
    const repo = getCustomRepository(ScheduleRepository)
    const result = await repo.deleteById(id)
    res.json(result)
  }),
)

/**
 * Settings
 */

router.get(
  '/settings',
  asyncHandler(async (req, res) => {
    const repo = getCustomRepository(SettingsRepository)
    const settings = await repo.findOrCreate()
    res.json(settings)
  }),
)

router.patch(
  '/settings',
  asyncHandler(async (req, res) => {
    const repo = getCustomRepository(SettingsRepository)
    const { unit } = req.body
    if (!unit) {
      res.status(422).json({ error: 'unit is required.' })
    }
    const settings = await repo.update(unit)
    res.json(settings)
  }),
)
