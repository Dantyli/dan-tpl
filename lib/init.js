//初始化项目
const inquire=require('inquirer')
const chalk=require('chalk')
const ora=require('ora')
const {TPL_GIT_REPO}= require('./config')
//const child=require('child_process')
const {isExist, downloadTemplate, updatePackage} =require('./util')

//项目信息
let promptList= [
    {
        type: 'input',
        name: 'name',
        message: 'Please enter project name:',
        validate(input) {
           if(!input){
               return '项目名不能为空！'
           }
           return true;
        }
    },
    {
        type: 'input',
        name: 'author',
        message: 'Please enter author name:',
        validate(input) {
            if(!input){
                return '作者名不能为空！'
            }
            return true;
         }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please enter the project description:'
    }
]

const prompt = ()=>{
    return new Promise(resolve=>{
        inquire.prompt(promptList).then(answers=>{
            resolve(answers)
        })
    })
}

const init=async ()=>{
    const project= await prompt()
    await isExist(project.name)
    const api=`direct:${TPL_GIT_REPO}`
    let loading = ora('downloading template ...')
    loading.start()
    await downloadTemplate(project.name,api)
    await updatePackage(`./${project.name}/package.json`,project)
    loading.stop()
    //切换目录执行命令
    //   await child.exec('mkdir sr',{cwd:'./admin'})
    console.log(chalk.green('complete ！'))
}
module.exports= init;