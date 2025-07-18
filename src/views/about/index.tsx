import { Descriptions, DescriptionsProps, Tag, Button } from 'antd'
import TypeIt from 'typeit-react'
const { pkg } = __APP_INFO__
const { version, author } = pkg
const devSchema: DescriptionsProps['items'] = []
const prodSchema: DescriptionsProps['items'] = []
const infoSchema: DescriptionsProps['items'] = [
  {
    key: 'name',
    label: '项目名称',
    children: pkg.name
  },
  {
    key: 'version',
    label: '版本号',
    children: <Tag color="blue">{version}</Tag>
  },
  {
    key: 'gitee',
    label: 'Gitee',
    children: (
      <Button className="h-0 p-0" type="link" href={author.url} target="_blank">
        Gitee
      </Button>
    )
  },
  {
    key: 'author',
    label: '作者',
    children: author.name
  }
]

Object.entries(pkg.devDependencies).forEach(([key, val]) => {
  devSchema.push({
    key,
    label: key,
    children: val
  })
})

Object.entries(pkg.dependencies).forEach(([key, val]) => {
  prodSchema.push({
    key,
    label: key,
    children: val
  })
})

const About: React.FC = () => {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="rounded bg-white p-2.5 dark:bg-[#141414]">
        <div className="text-base font-bold">关于</div>
        <TypeIt
          options={{
            speed: 50,
            waitUntilVisible: true,
            afterComplete: () => {
              const el = document.querySelector<HTMLElement>('.ti-cursor')
              if (el) {
                el.style.display = 'none'
              }
            }
          }}
          getBeforeInit={(instance) => {
            instance.type(
              '这是一个使用Vite、Antd、React Router、Zustand、TypeScript、UnoCSS、Ahooks 搭建的简易后台管理系统，用来学习React 相关知识...'
            )
            return instance
          }}
        />
      </div>
      <div className="rounded bg-white p-2.5 dark:bg-[#141414]">
        <Descriptions title="项目信息" bordered items={infoSchema} column={2} size="small" />
      </div>

      <div className="rounded bg-white p-2.5 dark:bg-[#141414]">
        <Descriptions title="生产环境依赖" bordered items={prodSchema} column={3} size="small" />
      </div>
      <div className="rounded bg-white p-2.5 dark:bg-[#141414]">
        <Descriptions title="开发环境依赖" bordered items={devSchema} column={3} size="small" />
      </div>
    </div>
  )
}
export default About
