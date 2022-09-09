"use strict"

import { Client as Base } from "discord.js"
import { join } from "path"
import { readdirSync } from "fs"
import { Guild, Locale } from "../imports"

//const Locale = require('../../packages/Locale')
//import { Guild } from "../database/Schemas/Guild"

export default class Client extends Base {
  constructor(opt) {
    super(opt)
    this.commands = []
    this.logs = []
    this.#loadCommands()
    this.#loadEvents()

  }

  registryCommands() {
    this.application.commands.set(this.commands)
  }

  #loadEvents(path = "src/commands") {
    const categories = readdirSync(path)

    for (const category of categories) {
      const events = readdirSync(`${path}/${category}`)

      for (const event of events) {
        (async () => {

          let eventClass = require(join(process.cwd(), `${path}/${category}/${event}`))
          let evt = new eventClass.default(this)

          this.on(evt.name, evt.run)
        })()

      }
    }

  }

  /**
   * @param {Path} path
   */

  #loadCommands(path = "src/commands") {
    const categories = readdirSync(path)

    for (const category of categories) {
      const commands = readdirSync(`${path}/${category}`)

      for (const command of commands) {
        (async () => {

          let commandClass = await import(join(process.cwd(), `${path}/${category}/${command}`))
          let cmd = new commandClass.default(this)

          this.commands.push(cmd)
        })()
      }
    }
  }

  async getLanguage(firstGuild) {
    if (!firstGuild) return;
    const guild = await Guild.findOne({
      server: firstGuild,
    });

    if (guild) {
      let lang = guild.botconfig.language;

      if (lang === undefined) {
        guild.botconfig.language = "portuguese";
        guild.save();

        return "portuguese";
      } else {
        return lang;
      }
    } else {
      await Guild.create({ server: firstGuild });

      return "portuguese";
    }
  }

  async getActualLocale() {
    return this.t;
  }

  async setActualLocale(locale) {
    this.t = locale;
  }

  async getTranslate(guild) {
    const language = await this.getLanguage(guild);

    const translate = new Locale("src/languages");

    const t = await translate.init({
      returnUndefined: false,
    });

    translate.setLang(language);

    return t;
  }
}