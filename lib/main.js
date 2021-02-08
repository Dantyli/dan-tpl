const program=require('commander')

program.version(require('../package').version)
       .usage('<command> [options]')
       .command('init')
       .description('create a new project from dantyli`s templatee')
       .action(()=>{
           require('./init')()
       })

program
       .command('create <name>')
       .description('创建其他模版，待实现')
       .action((name)=>{
           console.log(`--- ${name} is coming ---`)
       })

program.parse(process.argv)