const fs= require('fs')
const download=require('download-git-repo')
const inquire=require('inquirer')

//判断文件
exports.isExist=async (name)=>{
    return new Promise((resolve)=>{
        if(fs.existsSync(name)){
            console.log(chalk.red('该文件已存在，无法创建'))
        }else{
            resolve()
        }
    })
}

//下载模板
exports.downloadTemplate = async (ProjectName, api) => {
    return new Promise((resolve,reject)=>{
        download(api, ProjectName,{clone: true},(err)=>{
            if(err){
                reject(err)
            }else{
                resolve()
            }
        })
    })
}

//更新json配置
exports.updatePackage= (fileName, obj)=>{
    return new Promise(resolve=>{
       if(fs.existsSync(fileName)){
           const data=fs.readFileSync(fileName).toString()
           let json=JSON.parse(data)
           //合并输入参数
           json={...json,...obj}
           fs.writeFileSync(fileName, JSON.stringify(json, null, '\t'),'utf-8');
           resolve()
       }
    })
}