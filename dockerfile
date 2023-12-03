FROM node:21

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 并安装依赖
COPY package*.json ./
RUN npm install

# 复制整个 React 项目到工作目录
COPY . .

# 构建 React 项目
RUN npm run build

# 暴露端口 3000
EXPOSE 3000

# 启动 React 应用
CMD [ "npm", "start" ]
