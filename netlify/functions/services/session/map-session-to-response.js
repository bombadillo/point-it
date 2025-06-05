module.exports = (session) => {
    return {
        name: session.name,
        users: session.users,
        createdAt: session.created_at,
        groomingSuccessful: session.grooming_successful,
        allUsersPointed: session.all_users_pointed,
        pointsAreUnanimous: session.points_are_unanimous,
        revealPoints: session.reveal_points,
        agreedPoints: session.agreed_points,
        lastRestartTime: session.last_restart_time
    }
}
