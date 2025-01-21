import Minio from 'minio'

const minioClient = new Minio.Client({
    endPoint: '117.72.78.239',
    port: 9000,
    useSSL: false,
    accessKey: 'minioadmin',
    secretKey: 'minioadmin'
})

export default minioClient