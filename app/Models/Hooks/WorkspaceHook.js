'use strict'

// Tools
const uuid = require('uuid')
const slug = require('slug')

const WorkspaceHook = exports = module.exports = {}

WorkspaceHook.uuid = async (workspace) => {
  workspace.primaryKeyValue = uuid.v4()
}

WorkspaceHook.slug = async (workspace) => {
  workspace.slug_name = slug(workspace.name)
}
