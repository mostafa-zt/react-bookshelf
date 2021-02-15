import Skeleton from 'react-loading-skeleton'

const UserProfileLoader = () => {
    return (
        <div className="container">
            <div className="box_placeholder">
                <div style={{ textAlign: 'center' }}>
                    <Skeleton circle={true} height={150} width={150} />
                </div>
                <div style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Skeleton count={3} width={400} style={{ display: 'block', margin: 10 }} />
                </div>
            </div>
        </div>


    )
}

export default UserProfileLoader
